import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { getFocusableElements, nextFocus, usePortal } from "./utils";
import { cn } from "../cn";

const Frame = ({
  children,
  closeOnClickOutside = true,
  closeOnEsc = true,
  onClose,
  open = true,
}) => {
  const portal = usePortal();
  const previousFocus = useRef(null);

  // close on click outside
  const container = useRef(null);
  const onOverlayClick = (e) => {
    if (!container.current?.contains(e.target)) onClose();
  };

  // close on esc
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!open) return;

      switch (e.key) {
        case "Escape": {
          if (closeOnEsc) onClose();
          break;
        }
        case "Tab": {
          e.preventDefault();
          nextFocus(getFocusableElements(container.current), !e.shiftKey);
          break;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeOnEsc, onClose, open]);

  useEffect(() => {
    // aria-hidden
    document
      .getElementById("root")
      ?.setAttribute("aria-hidden", open.toString());
    portal.current?.setAttribute("aria-hidden", (!open).toString());

    if (open) {
      previousFocus.current = document.activeElement ?? null;
      nextFocus(getFocusableElements(container.current));
    } else {
      previousFocus.current?.focus?.();
      previousFocus.current = null;
    }
  }, [open, portal]); // note: when importing, eslint doesn't recognise that portal is a ref, so it doesn't need to be in the deps array

  return ReactDOM.createPortal(
    // transparent overlay: `inset-0` to stretch over the entire screen (combines`top-0`, `right-0`, `bottom-0`, and `left-0`)
    <div
      className={cn(
        "fixed inset-0 z-10 bg-gray-600/90 p-8 text-white",
        `${open ? "visible" : "invisible"}` // control visibility via `open` attribute (or render conditionally)
      )}
      onClick={closeOnClickOutside ? onOverlayClick : undefined}
    >
      {/* container: `max-w-sm` to make it reasonably narrow, `mx-auto` to center horizontally */}
      <div className="relative mx-auto mt-8 w-full max-w-sm" ref={container}>
        {/* contents */}
        <div className="overflow-hidden rounded bg-white shadow-xl">
          {children}
        </div>
        {/* closer in the corner */}
        <button
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center cursor-pointer justify-center rounded-full border-2 border-gray-600 bg-gray-600 shadow-xl outline-none focus:border-blue-300"
          onClick={() => onClose()}
          title="Bye bye 👋"
        >
          <span className="select-none text-2xl leading-6">&times;</span>
        </button>
      </div>
    </div>,
    portal.current
  );
};

const Head = ({ children }) => (
  <div className="block bg-white px-4 py-2 border-b text-gray-800">
    <h1 className="text-lg">{children}</h1>
  </div>
);

const Body = ({ children }) => <div className="p-4">{children}</div>;

export const Modal = { Frame, Head, Body };
