To add more filter options to the gallery, which are triggered by clicking marine life cards in the MarineLife component, follow these steps:

1. Add new marine life entries in src/components/MarineLife.jsx:

    Extend the marineLife array with new objects containing name, description, and image properties.
    Ensure the name matches the desired filter category (case-insensitive).

2. Update gallery filter categories in src/components/Gallery.jsx:

    Add the new category names (in lowercase) to the categories array.
    This array currently includes: ['all', 'manta rays', 'sea turtles', 'reef sharks', 'coral gardens'].

3. Add corresponding gallery images in src/lib/data.js:

    Extend the gallery array in INITIAL_DATA with new image objects.
    Each object should have id, type, alt, url, and category properties.
    Set category to match the new filter names (lowercase).
    The filtering logic in Gallery.jsx automatically handles new categories by checking img.category?.toLowerCase() === activeFilter. When a marine life card is clicked, it calls setFilterAndScroll(creature.name), which updates the global filter and scrolls to the gallery section.


==========================================================================================================
- To add more predefined values to the category option in the admin photo gallery, modify the options   array in the gallery configuration located in src/App.jsx.

- Add new category names to the options array in the gallery configuration.

- The options array currently includes: ['manta rays', 'sea turtles', 'reef sharks', 'coral gardens'].
- Add new category names to this array to make them available in the category dropdown.