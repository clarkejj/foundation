frappe.ready(function() {
	setTimeout(() => {
		// bind events here
		form = frappe.web_form.field_group.fields_dict;

		$(".page-header-actions-block .btn-primary, .page-header-actions-block .btn-default").addClass('hidden');
		$(".text-right .btn-primary").addClass('hidden');

		var set_amount = function() {
			var membership_type = $('select[data-fieldname="membership_type"]').val();
			amount = {
				'Gold': 300000,
				'Silver': 100000,
				'Individual': 10000
			}
			form.amount.set_input(amount[membership_type]);
		}

		var get_date = (add_year = 0) => {
			const today = new Date();
			const year = today.getFullYear() + add_year;
			const month = ((today.getMonth() + 1) + '').padStart(2, '0');
			const day = today.getDate();
			return year + '-' + month + '-' + day;
		}

		if(frappe.utils.get_url_arg('name')) {
			$('select[data-fieldname="membership_type"]').prop('disabled', true);
			$('input[data-fieldname="currency"]').prop('disabled', true);
			$('.page-content .btn-form-submit').addClass('hidden');
		} else {
			const from_date = get_date();
			const to_date = get_date(1);

			form.from_date.set_input(from_date);
			form.to_date.set_input(to_date);
			$('select[data-fieldname="membership_type"]').on('change', function() { set_amount(); });
			form.currency.set_input('INR');
			set_amount();
		}
	}, 1000);
})

