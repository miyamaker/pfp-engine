"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

// see src/blendMode.js for available blend modes
// documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
const { MODE } = require(path.join(basePath, "src/blendMode.js"));

const buildDir = path.join(basePath, "/build");
const layersDir = path.join(basePath, "/layers");

/*********************
 * General Generator Options
 ***********************/

const description =
  "This is the description of your NFT project, remember to replace this";
const baseUri = "ipfs://NewUriToReplace";

const outputJPEG = false; // if false, the generator outputs png's

/**
 * Set your tokenID index start number.
 * ⚠️ Be sure it matches your smart contract!
 */
const startIndex = 0;

const format = {
  width: 512,
  height: 512,
  smoothing: true, // set to false when up-scaling pixel art.
};

const background = {
  generate: true,
  brightness: "80%",
};

const layerConfigurations = [
  {
    growEditionSizeTo: 10,
    namePrefix: "Miyanetic", // Use to add a name to Metadata `name:`
    layersOrder: [
      { name: "BG" },
      { name: "z1,Body" },
      { name: "z1,Eyes" },
      { name: "z1,Mouths" },
      { name: "z1,Noses" },
      { name: "z2,Mask" },
      { name: "z2,Top" },
      { name: "Top Behind" },
      { name: "z2,Hat" },
      { name: "Hat Behind" },
      { name: "z1,Hair" },
      { name: "Hair Behind" },
    ],
  },
  // {
  //   growEditionSizeTo: 10,
  //   namePrefix: "Lion",
  //   resetNameIndex: true, // this will start the Lion count at #1 instead of #6
  //   layersOrder: [
  //     { name: "Background" },
  //     { name: "Hats" },
  //     { name: "Male Hair" },
  //   ],
  // },
];

/**
 * Set to true for when using multiple layersOrder configuration
 * and you would like to shuffle all the artwork together
 */
const shuffleLayerConfigurations = false;

const debugLogs = true;

/*********************
 * Advanced Generator Options
 ***********************/

// if you use an empty/transparent file, set the name here.
const emptyLayerName = "None";

/**
 * Incompatible items can be added to this object by a files cleanName
 * This works in layer order, meaning, you need to define the layer that comes
 * first as the Key, and the incompatible items that _may_ come after.
 * The current version requires all layers to have unique names, or you may
 * accidentally set incompatibilities for the _wrong_ item.
 */
const incompatible = {
  //   Red: ["Dark Long"],
  //   // directory incompatible with directory example
  //   White: ["rare-Pink-Pompadour"],
  "Cyborg Face Melt": ["z1,Noses", "z1,Mouths", "Lazer Ascension"],
  SHOCKED: "z1,Noses",
  "z2,Hat": "z1,Hair"
};

/**
 * Require combinations of files when constructing DNA, this bypasses the
 * randomization and weights.
 *
 * The layer order matters here, the key (left side) is an item within
 * the layer that comes first in the stack.
 * the items in the array are "required" items that should be pulled from folders
 * further in the stack
 */
const forcedCombinations = {
  "Mutant Body": ["Mutant Mouths"],
  "Futuristic Sweater": ["Behind Futuristic Sweater"],
  "Velvet Gold Skeleton Army Elitist": ["High Collar Winter Jacket"],
  "Aztec Warrior": ["Behind Aztec Warrior"],
  "Chinese Royalty": ["Behind Chinese Royalty"],
  "Asymmetrical impossible Cornrows": ["Behind Asymmetrical Impossible Cornrows"],
  "Black Messy Short": ["Behind Black Messy Short"],
  "Black Pigtails": ["Behind Black Pigtails"],
  "Black Straight Straight Bangs with Diamond Clip": ["Behind Black Straight Straight Bangs with Diamond Clip"],
  "Blonde Crazy Ties": ["Behind Blonde Crazy Ties"],
  "Blonde Curls": ["Behind Blonde Curls"],
  "Blonde spiked Bangs": ["Behind Blonde spiked Bangs"],
  "Blue Bangs": ["Behind BBlue Bangs"],
  "Blue Bob": ["Behind Blue Bob"],
  "Brown Curly": ["Behind Brown Curly"],
  "Brown Long Wavy": ["Behind Brown Long Wavy"],
  "Brunette Long Straight": ["Behind Brunette Long Straight"],
  "Brunette Wind Blown Long": ["Behind Brunette Wind Blown Long"],
  "Dreadlocks with Green Bangs.png": ["Behind Dreadlocks with Green Bangs.png"],
  "Faded SPikes": ["Behind Faded SPikes"],
  "Green Milady Bangs": ["Behind Green Milady Bangs"],
  "Long Dreads": ["Behind Long Dreads"],
  "Long Norse Blonde hair with Princess Braids": ["Behind Long Norse Blonde hair with Princess Braids"],
  "Messy Bedhead": ["Behind Messy Bedhead"],
  "Pastel Green Emo Swoop": ["Behind Pastel Green Emo Swoop"],
  "Pink and Blue blend Bangs": ["Pink and Blue blend Bangs"],
  "Pink and Blue Pigtails": ["Behind Pink and Blue Pigtails"],
  "Pink Sailor Miya Ponytails": ["Behind Pink Sailor Miya Ponytails"],
  "Purple Koolio Braids": ["Behind Purple Koolio Braids"],
  "Red side cut Bangs": ["Behind Red side cut Bangs"],
  "Red Straight Bangs with Sidecut": ["Behind Red Straight Bangs with Sidecut"],
  "Spiky Brown Mullet": ["Behind Spiky Brown Mullet"]
};

/**
 * In the event that a filename cannot be the trait value name, for example when
 * multiple items should have the same value, specify
 * clean-filename: trait-value override pairs. Wrap filenames with spaces in quotes.
 */
const traitValueOverrides = {
  // Helmet: "Space Helmet",
  // "gold chain": "GOLDEN NECKLACE",
};

const extraMetadata = {};

const extraAttributes = () => [
  // Optionally, if you need to overwrite one of your layers attributes.
  // You can include the same name as the layer, here, and it will overwrite
  //
  // {
  // trait_type: "Bottom lid",
  //   value: ` Bottom lid # ${Math.random() * 100}`,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Aqua Power",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Health",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Mana",
  //   value: Math.floor(Math.random() * 100),
  // },
];

// Outputs an Keccack256 hash for the image. Required for provenance hash
const hashImages = true;

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

/**
 * Set to true to always use the root folder as trait_type
 * Set to false to use weighted parent folders as trait_type
 * Default is true.
 */
const useRootTraitType = true;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  background,
  baseUri,
  buildDir,
  debugLogs,
  description,
  emptyLayerName,
  extraAttributes,
  extraMetadata,
  forcedCombinations,
  format,
  hashImages,
  incompatible,
  layerConfigurations,
  layersDir,
  outputJPEG,
  preview,
  preview_gif,
  rarityDelimiter,
  shuffleLayerConfigurations,
  startIndex,
  traitValueOverrides,
  uniqueDnaTorrance,
  useRootTraitType,
};