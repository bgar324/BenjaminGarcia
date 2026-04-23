"use client";

import { useState } from "react";
import type {
  FocusEventHandler,
  KeyboardEventHandler,
  PointerEventHandler,
} from "react";
import { useReducedMotion, type Transition } from "framer-motion";

type UseTactilePressOptions = {
  enabled?: boolean;
  includeSpaceKey?: boolean;
};

const TACTILE_SCALE = 0.9925;
const TACTILE_OFFSET_Y = 1;

export function useTactilePress(
  {
    enabled = true,
    includeSpaceKey = false,
  }: UseTactilePressOptions = {},
) {
  const [isPressed, setIsPressed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isPressKey = (key: string) =>
    key === "Enter" || (includeSpaceKey && key === " ");

  const resetPress = () => {
    setIsPressed(false);
  };

  const onPressPointerDown: PointerEventHandler<HTMLElement> = () => {
    if (enabled) {
      setIsPressed(true);
    }
  };

  const onPressPointerUp: PointerEventHandler<HTMLElement> = () => {
    resetPress();
  };

  const onPressPointerLeave: PointerEventHandler<HTMLElement> = () => {
    resetPress();
  };

  const onPressPointerCancel: PointerEventHandler<HTMLElement> = () => {
    resetPress();
  };

  const onPressKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    if (enabled && isPressKey(event.key)) {
      setIsPressed(true);
    }
  };

  const onPressKeyUp: KeyboardEventHandler<HTMLElement> = (event) => {
    if (enabled && isPressKey(event.key)) {
      resetPress();
    }
  };

  const onPressBlur: FocusEventHandler<HTMLElement> = () => {
    resetPress();
  };

  const pressTransition: Transition = shouldReduceMotion
    ? { duration: 0.15 }
    : { type: "spring", stiffness: 420, damping: 28, mass: 0.72 };

  return {
    isPressed,
    shouldReduceMotion,
    pressScale:
      shouldReduceMotion || !enabled || !isPressed ? 1 : TACTILE_SCALE,
    pressY:
      shouldReduceMotion || !enabled || !isPressed ? 0 : TACTILE_OFFSET_Y,
    pressTransition,
    onPressPointerDown,
    onPressPointerUp,
    onPressPointerLeave,
    onPressPointerCancel,
    onPressKeyDown,
    onPressKeyUp,
    onPressBlur,
  };
}
