import frappe

from erpnext.crm.doctype.opportunity.opportunity import Opportunity

class CustomOpportunity(Opportunity):
    @frappe.whitelist()
    def get_item_price_list_rate(self, item_code, price_list):
        return frappe.db.get_value("Item Price", {"item_code": item_code, "price_list":price_list, 'currency': self.currency}, "price_list_rate")
