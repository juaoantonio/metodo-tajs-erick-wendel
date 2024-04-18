import { describe, expect, it, jest } from "@jest/globals";
import { Person } from "../src/person.js";

describe("#Person Suite", () => {
  describe("#validate", () => {
    it("should throw if name is not present", () => {
      const mockInvalidPerson = {
        name: "",
        cpf: "123.213.541-12",
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("name is required"),
      );
    });

    it("should throw if cpf is not present", () => {
      const mockInvalidPerson = {
        name: "Joao",
        cpf: "",
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("cpf is required"),
      );
    });

    it("should not throw if cpf is not present", () => {
      const validPerson = {
        name: "Joao",
        cpf: "123.123.123-43",
      };

      expect(() => Person.validate(validPerson)).not.toThrow();
    });
  });

  describe("#format", () => {
    it("should format the person name and CPF", () => {
      // AAA

      // Arrange
      const mockedPerson = {
        name: "Joao Barbosa",
        cpf: "123.321.123-12",
      };

      // Act
      const formattedPerson = Person.format(mockedPerson);

      // Assert
      const expectedPerson = {
        name: "Joao",
        cpf: "12332112312",
        lastName: "Barbosa",
      };
      expect(formattedPerson).toStrictEqual(expectedPerson);
    });
  });

  describe("#save", () => {
    it("should save if formatted person", () => {
      const mockedValidPerson = {
        name: "Joao",
        cpf: "12345678900",
        lastName: "da Silva",
      };

      expect(() => Person.save(mockedValidPerson)).not.toThrow();
    });
    it("should throw if is invalid person", () => {
      const mockedValidPerson = {
        name: "Joao",

        lastName: "da Silva",
      };

      expect(() => Person.save(mockedValidPerson)).toThrow(
        new Error(
          `cannot save invalid person: ${JSON.stringify(mockedValidPerson)}`,
        ),
      );
    });
  });

  describe("#process", () => {
    it("should process a valid person", () => {
      // Arrange
      const mockedPerson = {
        name: "Joao da Silva",
        cpf: "123.456.789-00",
      };
      jest
        .spyOn(
          // Pulando o "caminho" A, pois já foi testado
          Person,
          Person.validate.name,
        )
        .mockReturnValue(undefined);

      jest
        .spyOn(
          // Pulando o "caminho" B, pois já foi testado
          Person,
          Person.format.name,
        )
        .mockReturnValue({
          cpf: "12345678900",
          name: "Joao",
          lastName: "da Silva",
        });

      // Act
      const result = Person.process(mockedPerson);

      // Assert
      const expected = "ok";
      expect(result).toStrictEqual(expected);
    });
  });
});
