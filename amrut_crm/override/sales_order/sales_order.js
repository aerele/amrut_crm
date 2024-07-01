
frappe.ui.form.on('Sales Order', {
	refresh(frm) {
		// your code here
		frm.set_query('custom_price_list', 'items', function() {
			return {
				filters: {
					'name': ['not in', frm.doc.selling_price_list],
					'selling': 1
				}
			}
		});
	}
})

frappe.ui.form.on('Sales Order Item', {
	custom_price_list(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		// your code here
        frm.call('get_item_price_list_rate', {item_code: row.item_code, price_list: row.custom_price_list}).then(function(r) {

			if (r.message) {
				frappe.model.set_value(cdt, cdn, 'rate', r.message);
				frappe.model.set_value(cdt, cdn, 'price_list_rate', r.message);
				frappe.model.set_value(cdt, cdn, 'discount_percentage', 0);
				frappe.model.set_value(cdt, cdn, 'discount_amount', 0);
			}
        
        })
    }
})