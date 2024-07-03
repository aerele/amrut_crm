
frappe.ui.form.on('Opportunity', {
	refresh(frm) {
		// your code here
		frm.set_query('custom_price_list', 'items', function() {
			return {
				filters: {
					"enabled": 1,
                    "currency": frm.doc.currency
				}
			}
		});
	}
})

frappe.ui.form.on('Opportunity Item', {
	custom_price_list(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		// your code here
        frm.call('get_item_price_list_rate', {item_code: row.item_code, price_list: row.custom_price_list}).then(function(r) {

			if (r.message) {
				frappe.model.set_value(cdt, cdn, 'rate', r.message);
			}
        
        })
    }
})