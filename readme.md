# Master Branch

# Functionalities

- Replaces hardcoded data with real data fetched from the Fake Store API.

- Includes all features from the Master Branch:

  - Product List Screen:

  - Displays a list of products with title, description, price, and image.

  - Product Details Screen:

  - Shows detailed information about a selected product.

  - Allows marking the product as a favorite.

- Favorites Tab:

  - Displays all favorited products.

  - Enables toggling between the product list and favorites.

* Implements loading and error states for API calls.
* Uses Context API for state management.

- API Integration

  - Data is fetched using axios() within useEffect hooks.

  - Includes loading indicators while data is being fetched and error handling for failed requests.

## How to Run the Project

### Prerequisites

- Node.js installed on your system.
- A package manager (npm or yarn).

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Denyyel914/React-Assessment/tree/master
   cd <repository-folder>

   ```

2. **Install Dependencies**

   ```bash
    npm install

   ```

3. **Run the Development Server: Using npm:**

   ```bash
    npm run dev

   ```
