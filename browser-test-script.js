// SCRIPT DE PRUEBA PARA EJECUTAR EN LA CONSOLA DEL NAVEGADOR
// Abre las Developer Tools (F12) y pega este código en la consola

// 1. Verificar conexión con Supabase
console.log("🔍 Verificando conexión con Supabase...");

// Importar Supabase (puede que necesites hacer esto desde la aplicación)
// Este script asume que ya estás en la página de la aplicación

// 2. Función para probar inserción directa
async function testInsertProgress() {
  console.log("🧪 Probando inserción directa en user_progress...");

  // Obtener el usuario actual
  const {
    data: { user },
    error: userError,
  } = await window.supabase.auth.getUser();

  if (userError) {
    console.error("❌ Error obteniendo usuario:", userError);
    return;
  }

  if (!user) {
    console.error("❌ No hay usuario autenticado");
    return;
  }

  console.log("👤 Usuario encontrado:", user.id);

  // Intentar insertar un registro de prueba
  const testData = {
    user_id: user.id,
    course_id: "test-course",
    cycle_id: 1,
    material_id: "test-material",
    completed: true,
  };

  console.log("📝 Datos a insertar:", testData);

  const { data, error } = await window.supabase
    .from("user_progress")
    .insert(testData);

  if (error) {
    console.error("❌ Error insertando:", error);
  } else {
    console.log("✅ Inserción exitosa:", data);
  }

  // Verificar que se insertó
  const { data: checkData, error: checkError } = await window.supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id);

  if (checkError) {
    console.error("❌ Error consultando:", checkError);
  } else {
    console.log("📊 Registros encontrados:", checkData);
  }
}

// 3. Función para verificar las políticas RLS
async function testRLSPolicies() {
  console.log("🔒 Probando políticas RLS...");

  const {
    data: { user },
  } = await window.supabase.auth.getUser();

  if (!user) {
    console.error("❌ No hay usuario para probar RLS");
    return;
  }

  // Probar SELECT
  const { data, error } = await window.supabase
    .from("user_progress")
    .select("*");

  console.log("📊 Resultado SELECT:", { data, error });
}

// 4. Ejecutar pruebas
console.log("🚀 Iniciando pruebas...");
console.log("👉 Ejecuta: testInsertProgress()");
console.log("👉 Ejecuta: testRLSPolicies()");

// Auto-ejecutar si está disponible
if (typeof window !== "undefined" && window.supabase) {
  testInsertProgress();
} else {
  console.log("⚠️ Supabase no está disponible globalmente");
  console.log("👉 Asegúrate de estar en la página de la aplicación");
}
