import { vi } from "vitest";

export const gsap = {
  from: vi.fn(),
  fromTo: vi.fn(),
  to: vi.fn(),
  set: vi.fn(),
  timeline: vi.fn(() => ({
    from: vi.fn().mockReturnThis(),
    to: vi.fn().mockReturnThis(),
    fromTo: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
  })),
  ticker: {
    add: vi.fn(),
    remove: vi.fn(),
    lagSmoothing: vi.fn(),
  },
  registerPlugin: vi.fn(),
};

export const useGSAP = vi.fn();

export const ScrollTrigger = {
  update: vi.fn(),
  refresh: vi.fn(),
  create: vi.fn(),
};

export const Lenis = vi.fn().mockImplementation(() => ({
  on: vi.fn(),
  raf: vi.fn(),
  destroy: vi.fn(),
}));
