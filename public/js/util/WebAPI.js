export default {

  // authorization: Bearer we9Jk7lJaZYK0y21JUMYQxYJiBALifnH0B+QgLAGGUlkmwML0xNpc6YfNvlgUnHN
  getItems() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Item 1', 'Item 2', 'Item 3'].map((item, i) => {
          return {
            id: i,
            label: item
          };
        }));
      }, 500);
    });
  }
};
