export const userType = {
    coordinator: 'Coordinator',
    admin: 'Admin',
    supervisor: 'Supervisor',
    student: 'Student',
}

export const trimCheck = (value = '') => value?.trim() === '' ? true : false;