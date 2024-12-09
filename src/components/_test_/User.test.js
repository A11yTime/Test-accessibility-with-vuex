import { render, screen, waitFor } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import UserData from '../UserData.vue';
import { createStore } from 'vuex'; // Import createStore to create the mock store
import axe from 'axe-core';

describe('UserData.vue', () => {
    // Create a mock Vuex store
    const mockStore = createStore({
        state: {
            loading: false,
            users: [
                { id: 1, name: 'John Doe', email: 'john@example.com', company: { name: 'Company' } },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: { name: 'Company' } },
            ],
            error: null,
        },
        actions: {
            fetchUsers: vi.fn(), // Mock the fetchUsers action
        },
    });

    it('renders loading state', async() => {
        mockStore.state.loading = true; // Simulate loading state

        render(UserData, {
            global: {
                plugins: [mockStore], // Provide the mock store
            },
        });

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state', async() => {
        mockStore.state.loading = false;
        mockStore.state.error = 'Something went wrong'; // Simulate an error

        render(UserData, {
            global: {
                plugins: [mockStore], // Provide the mock store
            },
        });

        expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
    });

    it('renders users list when not loading or error', async() => {
        mockStore.state.loading = false;
        mockStore.state.error = null;

        render(UserData, {
            global: {
                plugins: [mockStore], // Provide the mock store
            },
        });

        // Check if user names are displayed
        expect(screen.getByText('Users List')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    // Accessibility Test: Check for no violations
    it('should have no accessibility violations', async() => {
        const { container } = render(UserData, {
            global: {
                plugins: [mockStore], // Provide the mock store
            },
        });

        // Ensure the component is rendered fully before running axe
        await waitFor(() => {
            expect(screen.getByText('Users List')).toBeInTheDocument();
        });

        // Run axe accessibility checks
        const results = await axe.run(container);
        expect(results.violations).toHaveLength(0); // Ensure there are no violations
    });
});