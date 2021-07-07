# Prototype parcours VAM

## Development

### Commands

See [package.json](package.json) for the list of available commands

### Packages

#### Root

The package you're in where you have access to the global commands. This package contains the modules necessary to run the swagger gen and gives you shortcuts to run sub packages commands
(start frontend/backend, generate swagger, ...) see package.json for the complete list and exact command names.

#### Frontend

The react app, see the package's [README](./frontend/README.md) for more informations

#### Backend

An express backend containing a single proxy route to the various apis we are calling, see the package's [README](./backend/README.md) for more informations
