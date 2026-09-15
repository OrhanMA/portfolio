"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

function Avatar({
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      {...props}
    />
  )
}

function AvatarImage(props: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      {...props}
    />
  )
}

function AvatarFallback(props: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      {...props}
    />
  )
}

function AvatarBadge(props: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      {...props}
    />
  )
}

function AvatarGroup(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      {...props}
    />
  )
}

function AvatarGroupCount(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
