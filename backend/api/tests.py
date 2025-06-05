from django.test import TestCase
from .models import Item

class ItemModelTest(TestCase):
    def setUp(self):
        Item.objects.create(
            name="Test Item",
            description="This is a test item description"
        )

    def test_item_creation(self):
        item = Item.objects.get(name="Test Item")
        self.assertEqual(item.name, "Test Item")
        self.assertEqual(item.description, "This is a test item description")

    def test_item_str_method(self):
        item = Item.objects.get(name="Test Item")
        self.assertEqual(str(item), "Test Item")
