// services/medicalService.ts

let appointments: any[] = [];

// Obtener citas agendadas
export const getAppointments = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(appointments), 800);
  });
};

// Crear nueva cita
export const createAppointment = async (appointment: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      appointments.push(appointment);
      resolve(appointment);
    }, 800);
  });
};

// Obtener citas disponibles (simuladas)
export const getAvailableAppointments = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { date: '2025-10-15', time: '09:00' },
        { date: '2025-10-15', time: '10:00' },
        { date: '2025-10-16', time: '11:00' },
      ]);
    }, 800);
  });
};
