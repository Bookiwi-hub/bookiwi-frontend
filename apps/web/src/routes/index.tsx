import { createFileRoute, Navigate } from "@tanstack/react-router";

function index() {
  return <Navigate to="/my-kiwis" />;
}

export const Route = createFileRoute("/")({
  component: index,
});
