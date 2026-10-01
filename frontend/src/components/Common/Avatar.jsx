/**
 * Avatar — round user picture with a placeholder.
 *
 * `name` is the slug of a file in src/assets/avatars (see src/assets/index.js); a neutral
 * silhouette is shown until that file exists.
 */
import { avatarImages } from '../../assets';

import Icon from './Icon';

const Avatar = ({ name = 'default', alt = '', size = 50, className = '' }) => {
  const src = avatarImages[name];
  const box = { width: size, height: size };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        draggable="false"
        className={`shrink-0 select-none rounded-full object-cover ${className}`}
        style={box}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={alt}
      data-placeholder="avatar"
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-slate-300 to-slate-400 text-white ${className}`}
      style={box}
    >
      <Icon name="user" size={Math.round(size * 0.56)} filled strokeWidth={1.5} />
    </span>
  );
};

export default Avatar;
