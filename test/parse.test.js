import { parse } from "tnkb";
import assert from "node:assert";
import { describe, it } from "node:test";

describe("on parse()", () => {
  describe("on invalid strings", () => {
    it("should throw an error if itsn't a string", () => {
      assert.throws(
        () => {
          parse(1);
        },
        Error,
        "plateNumber must be a string",
      );
    });

    it("should throw an error if > 9 characters", () => {
      assert.throws(
        () => {
          parse("12345678901");
        },
        Error,
        "plate number must be less than 9 characters",
      );
    });
  });

  describe("on valid strings", () => {
    describe("on valid formats", () => {
      it("should not throw an error for valid format 'AB1234DEF'", () => {
        const plateNumber = "AB1234DEF";
        assert.deepEqual(parse(plateNumber), {
          area: "AB",
          id: 1234,
          serial: "DEF",
        });
      });

      it("should not throw an error for valid format 'AB123C'", () => {
        const plateNumber = "AB123C";
        assert.deepEqual(parse(plateNumber), {
          area: "AB",
          id: 123,
          serial: "C",
        });
      });

      it("should not throw an error for valid format 'A123'", () => {
        const plateNumber = "A123";
        assert.deepEqual(parse(plateNumber), {
          area: "A",
          id: 123,
          serial: "",
        });
      });

      it("should not throw an error for valid format 'ABC9999'", () => {
        const plateNumber = "ABC9999";
        assert.deepEqual(parse(plateNumber), {
          area: "ABC",
          id: 9999,
          serial: "",
        });
      });

      it("should not throw an error for valid format 'AB1D'", () => {
        const plateNumber = "AB1D";
        assert.deepEqual(parse(plateNumber), {
          area: "AB",
          id: 1,
          serial: "D",
        });
      });
    });

    describe("on invalid formats", () => {
      it("should throw an error if starts with a number", () => {
        const plateNumber = "12AA0000X";
        assert.throws(
          () => {
            parse(plateNumber);
          },
          Error,
          `plate number: ${plateNumber} is not valid and must be in the format AA0000XXX`,
        );
      });

      it("should throw an error for empty first part", () => {
        const plateNumber = "1234DEF";
        assert.throws(
          () => {
            parse(plateNumber);
          },
          Error,
          `plate number: ${plateNumber} is not valid and must be in the format AA0000XXX`,
        );
      });

      it("should throw an error for more than 3 letters at the start", () => {
        const plateNumber = "ABCD1234EF";
        assert.throws(
          () => {
            parse(plateNumber);
          },
          Error,
          `plate number: ${plateNumber} is not valid and must be in the format AA0000XXX`,
        );
      });

      it("should throw an error for more than 4 digits in the middle", () => {
        const plateNumber = "ABC12345DEF";
        assert.throws(
          () => {
            parse(plateNumber);
          },
          Error,
          `plate number: ${plateNumber} is not valid and must be in the format AA0000XXX`,
        );
      });

      it("should throw an error for more than 3 letters at the end", () => {
        const plateNumber = "ABC1234DEFG";
        assert.throws(
          () => {
            parse(plateNumber);
          },
          Error,
          `plate number: ${plateNumber} is not valid and must be in the format AA0000XXX`,
        );
      });

      it("should throw an error for numeric part out of range", () => {
        const plateNumber = "ABC0000DEF";
        assert.throws(
          () => {
            parse(plateNumber);
          },
          Error,
          `plate number: ${plateNumber} is not valid and must be in the format AA0000XXX`,
        );
      });

      it("should throw an error for non-numeric characters in the middle part", () => {
        const plateNumber = "ABC12A4DEF";
        assert.throws(
          () => {
            parse(plateNumber);
          },
          Error,
          `plate number: ${plateNumber} is not valid and must be in the format AA0000XXX`,
        );
      });

      it("should throw an error for special characters", () => {
        const plateNumber = "ABC123@DEF";
        assert.throws(
          () => {
            parse(plateNumber);
          },
          Error,
          `plate number: ${plateNumber} is not valid and must be in the format AA0000XXX`,
        );
      });
    });
  });
});
