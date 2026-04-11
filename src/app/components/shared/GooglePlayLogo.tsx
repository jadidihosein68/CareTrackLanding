type GooglePlayLogoProps = {
  className?: string;
};

export function GooglePlayLogo({ className }: GooglePlayLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M3 2.5L10.8 10.3L7.7 13.4L3 8.7V2.5Z" fill="#00C2FF" />
      <path d="M3 8.7L7.7 13.4L10.9 16.6L3 24V8.7Z" fill="#00E676" />
      <path d="M10.8 10.3L14.1 12L10.9 13.7L7.7 13.4L10.8 10.3Z" fill="#FFD54F" />
      <path d="M21 12L14.1 15.8L10.9 13.7L14.1 12L10.8 10.3L14 8.2L21 12Z" fill="#FF5252" />
      <path d="M3 2.5L14 8.2L10.8 10.3L3 2.5Z" fill="#3D5AFE" />
    </svg>
  );
}
