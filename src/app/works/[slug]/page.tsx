import { notFound } from "next/navigation";
import { getWorkMap, workMaps } from "../data";
import { CrimeMap } from "./CrimeMap";
import { SceneMap } from "./SceneMap";

export function generateStaticParams() {
  return workMaps.map((work) => ({ slug: work.slug }));
}

export default async function WorkMapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "crime-and-punishment") return <CrimeMap />;
  const work = getWorkMap(slug);
  if (!work) notFound();
  return <SceneMap work={work} />;
}
