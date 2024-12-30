type Props = {
  size?: number | string;
};

export function GitlabLoader({ size = 24 }: Props) {
  return (
    <span role={'status'} class={'gl-spinner-container'}>
      <span
        style={{
          width: size,
          height: size,
        }}
        class={'gl-spinner gl-spinner-sm gl-spinner-dark !gl-align-text-bottom'}
      />
    </span>
  );
}
