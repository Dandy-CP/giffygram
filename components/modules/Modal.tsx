import React, {
  useEffect,
  useRef,
  forwardRef,
  DetailedHTMLProps,
  DialogHTMLAttributes,
} from 'react';
import { IconX } from '@tabler/icons-react';

interface IModalProps {
  isOpen: boolean | string | string[] | undefined;
  onClose: () => void;
  preventClose?: boolean;
}

type Ref = HTMLDialogElement;

export type DialogProps = DetailedHTMLProps<
  DialogHTMLAttributes<HTMLDialogElement>,
  HTMLDialogElement
> &
  IModalProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Modal = forwardRef<Ref, DialogProps>((props, refs) => {
  const ref = useRef<HTMLDialogElement | null>(null);

  const { isOpen, onClose, preventClose = false, children, ...rest } = props;

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={ref} className="modal" {...rest}>
      <div className="modal-box w-11/12 max-w-7xl p-0">
        <form method="dialog">
          {!preventClose && (
            <button
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 phone:text-white"
              onClick={() => {
                onClose();
              }}
            >
              <IconX />
            </button>
          )}
        </form>

        {isOpen && <React.Fragment>{children}</React.Fragment>}
      </div>

      <form method="dialog" className="modal-backdrop">
        {!preventClose && (
          <button
            type="button"
            aria-label="btn"
            onClick={() => {
              onClose();
            }}
          />
        )}
      </form>
    </dialog>
  );
});

Modal.displayName = 'Modal';
export default Modal;
