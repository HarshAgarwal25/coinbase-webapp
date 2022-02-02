import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "f36so28s",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "skAAAnPqgVkge1Nve2c3BxP0Ij2fsCofaT2oIPkEZlaULtVDxBFI8mKl0Qi5Omt1Wuaj3vthGZHq76IvcQzfDsmILapkUqvsIrme2i3U7eVSVdbLgySP7L0zdCGcrxi3Mk0zAk1mVjnNchn7tf2HGPtBgM4kwomeUsvncbSj1mdGA1siUxdu",
  useCdn: false,
});
