"use client";

// Tombol submit yang meminta konfirmasi sebelum aksi yang tidak bisa dibatalkan.
export function ConfirmButton({
  message,
  className = "btn-danger",
  children,
}: {
  message: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
