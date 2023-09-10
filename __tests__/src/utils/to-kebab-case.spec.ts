import { toKebabCase } from "../../../src/utils/to-kebab-case";

describe("toKebabCase", () => {
  it("should convert a string to kebab case", () => {
    expect(toKebabCase("normal")).toStrictEqual("normal");

    expect(toKebabCase("PascalCase")).toStrictEqual("pascal-case");

    expect(toKebabCase("camelCase")).toStrictEqual("camel-case");

    expect(toKebabCase("kebab-case")).toStrictEqual("kebab-case");

    expect(toKebabCase("PascalCase-camelCase")).toStrictEqual(
      "pascal-case-camel-case",
    );
  });
});
