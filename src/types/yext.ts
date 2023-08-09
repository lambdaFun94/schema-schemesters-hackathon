export type Stereotype = "SIMPLE" | "URL" | "MULTILINE";

export interface StringType {
  stereotype: Stereotype;
}

export interface ListType {
  typeId: string;
  type?: YextFieldType;
}

export interface ImageType {
  isSimpleImage: boolean;
  unconstrainedAspectRatioAllowed: boolean;
}

export interface YextFieldType {
  stringType?: StringType;
  booleanType?: Record<string, never>;
  decimalType?: Record<string, never>;
  listType?: ListType;
  imageType?: ImageType;
  structType?: {
    property: {
      name: string;
      typeId: string;
      displayName: string;
      isRequired: boolean;
      type?: YextFieldType;
    }[];
  };
}

export interface YextField {
  inputId: string;
  $id: string;
  displayName: string;
  typeId: string;
  type?: YextFieldType;
}

export interface YextCustomFieldProperty {
  name: string;
  typeId: string;
  displayName: string;
  isRequired: boolean;
  type?: YextFieldType;
}
