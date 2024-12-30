import { Project } from '../../types/Project';

type Props = {
  project: Project;
  size?: 16 | 24 | 32;
};

export function GitlabProject({ project, size = 32 }: Props) {
  return (
    <span class={'gl-flex gl-w-full gl-items-center'}>
      {project.avatarUrl ? (
        <img
          alt={project.name}
          class={`gl-mr-3 gl-avatar gl-avatar-s${size}`}
          src={project.avatarUrl}
        />
      ) : (
        <div
          class={`gl-mr-3 gl-avatar gl-avatar-identicon gl-avatar-s${size} gl-avatar-identicon-bg1`}
        >
          {project.name[0].toUpperCase()}
        </div>
      )}
      <span>
        <span class={'gl-mr-2 gl-block'}>{project.name}</span>
        <span class={'gl-block gl-text-secondary !gl-text-sm'}>
          {project.nameWithNamespace}
        </span>
      </span>
    </span>
  );
}
