type Props = {
  size?: number | string;
};

export function GitlabLoader({ size = 24 }: Props) {
  return (
    <span class={'gl-spinner-container'} role={'status'}>
      <span
        class={'gl-spinner gl-spinner-sm gl-spinner-dark !gl-align-text-bottom'}
        style={{
          width: size,
          height: size,
        }}
      />
    </span>
  );
}
