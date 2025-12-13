import type { ReactNode } from 'react';

interface AnimatedBackgroundProps {
  children?: ReactNode;
  className?: string; // Allow overriding/adding classes (e.g., for fixed positioning)
}

const AnimatedBackground = ({ children, className = '' }: AnimatedBackgroundProps) => {
  return (
    <div className={`background ${className}`}>
        {/* Cubes */}
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        
        {/* Content Overlay - requires z-index if background elements interfere, 
            but here cubes are absolute, content should stack naturally if children are rendered.
            However, we might want children to be in a relative container on top. 
        */}
        {children && <div className="relative z-10 h-full w-full overflow-y-auto">{children}</div>}
    </div>
  );
};

export default AnimatedBackground;
