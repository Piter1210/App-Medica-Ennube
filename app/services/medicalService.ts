// services/medicalService.ts

// Aquí podrías conectar con tu backend real.
// Por ahora lo simulamos en memoria 👇
let appointments: any[] = [];

export const getAppointments = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(appointments), 800);
  });
};

export const createAppointment = async (appointment: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      appointments.push(appointment);
      resolve(appointment);
    }, 800);
  });
};
