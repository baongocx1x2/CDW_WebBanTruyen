$(document).ready(function () {
    const doneTypingInterval = 500;

    let levelSelect = $("#tdVanHoa");
    let citySelect = $("#thanhPho");
    let districtSelect = $("#quan");
    let wardSelect = $("#phuong");

    let emailInput = $("#email");
    let emailTypingTimer;
    let passwordInput = $("#matKhau");
    let rePasswordInput = $("#nhapLaiMatKhau");
    let rePasswordTypingTimer;

    let genderFilter = $("#gender-filter");

    $.ajax({
        url: '/api/getLevel',
        method: 'GET',
        success: function (data) {
            $.each(data, function (i, item) {
                levelSelect.append('<option value="' + item + '">' + item + '</option>');
            });
        }
    })

    $.ajax({
        url: '/api/getCity',
        method: 'GET',
        success: function (data) {
            $.each(data, function (i, item) {
                citySelect.append('<option value="' + item + '">' + item + '</option>');
            });
        }
    })

    citySelect.on('change', function () {
        $.ajax({
            url: '/api/getDistrict?city=' + citySelect.val(),
            method: 'GET',
            success: function (data) {
                districtSelect.empty();
                $.each(data, function (i, item) {
                    districtSelect.append('<option value="' + item + '">' + item + '</option>');
                });
                districtSelect.trigger('change');
            }
        })
    });

    districtSelect.on('change', function () {
        $.ajax({
            url: '/api/getWard?city=' + citySelect.val() + '&district=' + districtSelect.val(),
            method: 'GET',
            success: function (data) {
                wardSelect.empty();
                $.each(data, function (i, item) {
                    wardSelect.append('<option value="' + item + '">' + item + '</option>');
                });
            }
        })
    });


    emailInput.on('input', function () {
        clearTimeout(emailTypingTimer);
        $("#email-error").text('');
        const value = $(this).val();
        if (value.trim() !== '') {
            emailTypingTimer = setTimeout(function () {
                $.ajax({
                    url: 'api/checkEmail?email=' + value,
                    method: 'GET',
                    success: function (data) {
                        console.log(data)
                        if (!data) {
                            $("#email-error").text('Email này đã có người đăng ký. Thử lại.')
                        }
                    }
                })
            }, doneTypingInterval);
        }
    });

    rePasswordInput.on('input', function () {
        clearTimeout(rePasswordTypingTimer);
        $('#re-password-error').text('');
        const value = $(this).val();
        if (value.trim() !== '') {
            rePasswordTypingTimer = setTimeout(function () {
                if (value !== passwordInput.val()) {
                    $('#re-password-error').text('Mật khẩu không trùng. Thử lại.');
                }
            }, doneTypingInterval);
        }
    });

    function formatDate(input) {
        const date = new Date(input);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    genderFilter.on('change', function () {
        const value = $(this).val();
        console.log(value);
        $.ajax({
            url: '/getByGender?nu=' + value,
            method: 'GET',
            success: function (data) {
                let table = $("#table");
                table.empty();
                let html = `<tr><th>Họ tên</th>\n' + '<th>Ngày sinh</th>\n' + '<th>Giới tính</th>\n' + '<th>Email</th></tr>`;
                data.forEach(function (user) {
                    html += `<tr>
                    <td>${user.hoTen}</td>
                    <td>${formatDate(user.ngaySinh)}</td>
                    <td>${user.nu ? 'Nữ' : 'Nam'}</td>
                    <td><a href="/detail?email=${user.email}">${user.email}</a></td>
                    </tr>`
                });
                table.html(html);
            }
        })
    });
});
