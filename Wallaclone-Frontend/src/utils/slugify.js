
//función para generar el slug a partir del nombre del anuncio reemplazando espacios por guiones,eliminando caracteres especiales etc

export function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')       
      .replace(/[^\w\-]+/g, '')   
      .replace(/\-\-+/g, '-');    
  }