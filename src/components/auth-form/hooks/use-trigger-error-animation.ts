import { useCallback, useState } from 'react';

type UseTriggerErrorAnimation = () => {
  isErrorAnimationTriggered: boolean;
  triggerErrorAnimation(): void;
};

export const useTriggerErrorAnimation: UseTriggerErrorAnimation = () => {
  const [isErrorAnimationTriggered, setIsErrorAnimationTriggered] =
    useState(false);

  const triggerErrorAnimation = useCallback(() => {
    if (!isErrorAnimationTriggered) {
      setIsErrorAnimationTriggered(true);
      setTimeout(() => {
        setIsErrorAnimationTriggered(false);
      }, 500);
    }
    // We update isErrorAnimationTriggered inside the callback,
    // hence we don't want it as a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isErrorAnimationTriggered,
    triggerErrorAnimation,
  };
};
