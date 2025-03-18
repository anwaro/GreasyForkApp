import { Label } from '../../types/Label';

type Props = { label?: Label };

export function StatusIndicator({ label }: Props) {
  if (!label) {
    return null;
  }

  return (
    <div
      title={label.title}
      style={{
        minWidth: 10,
        width: 10,
        backgroundColor: label.color,
        borderRadius: 10,
        height: 10,
        marginRight: 2,
      }}
    />
  );
}
