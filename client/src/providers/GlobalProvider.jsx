import React from 'react';

import { AuthProvider } from '../contexts';

// In place separately here to add more context providers if needed

export default function GlobalProvider({ children }) {
	return <AuthProvider>{children}</AuthProvider>;
}
