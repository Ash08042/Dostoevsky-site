import CharacterPortraitArchive from "../CharacterPortraitArchive";

type CharacterDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  const { id } = await params;
  return <CharacterPortraitArchive initialCharacterId={id} />;
}
