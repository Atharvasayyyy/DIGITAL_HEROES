# Refactor Example

## Before

```js
export const updateUser = async (req, res, next) => {
  try {
    const user = await updateUserById(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
```

## After

```js
export const updateUser = async (req, res, next) => {
  try {
    const user = await modifyUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
```

## Improvements

- Separated business logic into `modifyUser` service.
- Removed direct data access from controller.
- Improved readability and testability.
- Centralized error handling through middleware.
- Reduced duplication by using repository functions.
