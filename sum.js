//Funcion calculo nota final 
function calcWeightedGrade(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new TypeError("El arreglo no deben estar vacio");
  }

  let totalWeight = 0;
  let totalScore = 0;

  for (const item of items) {
    if (typeof item.score !== "number" || typeof item.weight !== "number") {
      throw new TypeError("La nota y el peso deben ser numeros");
    }
    if (item.score < 0 || item.score > 100) {
      throw new RangeError("La nota tiene que estar entre 0 a 100");
    }
    if (item.weight < 0 || item.weight > 1) {
      throw new RangeError("El peso debe estar entre 0 y 1");
    }
    totalWeight += item.weight;
    totalScore += item.score * item.weight;
  }

  if (Math.abs(totalWeight - 1) > 0.001) {
    throw new RangeError("El peso total deberia sumar 1 (±0.001 tolerancia)");
  }

  return Number(totalScore.toFixed(2));
}

//Funcion calculo percentil
function percentile(p, values) {
  if (typeof p !== "number" || !Number.isFinite(p)) {
    throw new TypeError("El percentil p debe ser un numero finito");
  }
  if (p < 0 || p > 100) {
    throw new RangeError("El percentil debe estar entre 0 a 100");
  }
  if (!Array.isArray(values) || values.length < 1) {
    throw new TypeError("Values no debe ser un arreglo vacio de numeros");
  }
  if (values.some(v => typeof v !== "number" || !Number.isFinite(v))) {
    throw new TypeError("Values solo debe contener numeros finitos");
  }

  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;

  if (p === 0) return Number(sorted[0].toFixed(2));
  if (p === 100) return Number(sorted[n - 1].toFixed(2));

  const rank = Math.ceil((p / 100) * n);
  return Number(sorted[rank - 1].toFixed(2));
}

module.exports = {calcWeightedGrade,percentile};