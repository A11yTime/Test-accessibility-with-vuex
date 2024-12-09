import '@testing-library/jest-dom'; // For additional matchers like `toBeInTheDocument`
import axe from 'axe-core'; // Import axe-core directly

// Optional: Add a global reference to axe (optional, but convenient)
globalThis.axe = axe;

// Optionally, extend Vitest with axe matchers
expect.extend({
    async toHaveNoViolations(container) {
        const results = await axe.run(container);
        if (results.violations.length) {
            return {
                pass: false,
                message: () => {
                    return `Accessibility violations found:\n\n${JSON.stringify(results.violations, null, 2)}`;
                },
            };
        }
        return { pass: true };
    },
});

// above for acessibility 

// Import @testing-library/jest-dom to extend `expect` with custom matchers
import '@testing-library/jest-dom';

// Use Vitest's `vi` for mocks and spies (replaces `jest.fn()`, `jest.clearAllMocks()`, etc.)
import { vi } from 'vitest';

// Mocking Axios globally in all tests
import axios from 'axios';

// Mock axios.get, axios.post, and other methods as needed
vi.mock('axios', () => ({
    get: vi.fn(),
    post: vi.fn(),
    // You can mock other methods like put, delete if you need them
}));

// Optionally, you can mock global objects here (e.g., localStorage)
beforeAll(() => {
    // Example of mocking `localStorage`
    global.localStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
    };
});

// If you need to clear mocks after each test
afterEach(() => {
    vi.clearAllMocks(); // Clears all mocks between tests (Vitest equivalent of jest.clearAllMocks)
});