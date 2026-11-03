import { Suspense } from "react";
import { connection } from "next/server";
import { StudioClient } from "./StudioClient";

async function StudioDynamicMarker() {
  await connection();
  return null;
}

export default function StudioPage() {
  return (
    <>
      <StudioClient />
      <Suspense fallback={null}>
        <StudioDynamicMarker />
      </Suspense>
    </>
  );
}
