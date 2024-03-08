import { describe, expect, it, jest } from "@jest/globals";
import Autor from "../../models/autor.js";

describe("Testando modelo Autor", () => {
  const autor = new Autor({
    nome: "John Doe",
    nacionalidade: "Brasileiro"
  });

  autor.salvar = jest.fn().mockReturnValue(new Autor({
    id: 10,
    nome: 'Luiz Victor',
    nacionalidade: 'Brasileiro',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));

  it("should instance a new autor", () => {
    expect(autor).toBeInstanceOf(Autor);
  });

  it("should save a autor", () => {
    expect(autor.salvar()).toBeInstanceOf(Autor);
  });

  it('should have the correct types', async () => {

    const autor = new Autor({
      nome: "John Doe",
      nacionalidade: "Brasileiro"
    });
  
    autor.salvar = jest.fn().mockReturnValue(new Autor({
      id: 11,
      nome: 'Luiz Victor',
      nacionalidade: 'Brasileiro',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    const autorSaved = await autor.salvar();

    expect(autorSaved).toEqual(
      expect.objectContaining({
        ...autorSaved,
        id: expect.any(Number),
        nome: expect.any(String),
        nacionalidade: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    )
  })
});
