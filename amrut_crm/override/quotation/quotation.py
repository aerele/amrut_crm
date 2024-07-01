import frappe

from erpnext.selling.doctype.quotation.quotation import Quotation

class CustomQuotation(Quotation):
    @frappe.whitelist()
    def get_item_price_list_rate(self, item_code, price_list):
        return frappe.db.get_value("Item Price", {"item_code": item_code, "price_list":price_list }, "price_list_rate")
