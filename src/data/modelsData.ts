export interface OrganelleDetail {
  id: string;
  name: string;
  description: string;
  function: string;
}

export interface Model3DMetadata {
  id: string;
  name: string;
  category: string;
  glbFile: string;
  previewImage: string;
  nihSource: string;
  description: string;
  organelles: OrganelleDetail[];
}
