angular.module('myApp', ['ngCookies']).controller('CookieController', function($scope, $cookies, $http) {
    // Get the username and password from the cookie (if it exists)
    const username = $cookies.get('username');
    const password = $cookies.get('password');

    //if username was found in cookies it sets the logged in variable to true and sets scope variables
    if (username) {
        $scope.loggedIn = true;
        $scope.username = username;
        $scope.password = password;
    }
    //else sets logged in to false and unsets scope variables
    else {
        $scope.loggedIn = false;
        $scope.username = '';
        $scope.password = '';
    }

    //handles the login functionality
    $scope.login = function() {

        //gets the password and username from the login form
        var userData = {
            username: $scope.username,
            password: $scope.password
        };

        // Send login request to the server at port 3000
        $http.post('http://localhost:3000/login', userData)

            // Handles successful login responses
            .then(function(response) {

                // if login credentials were already in the database and were entered correctly
                if (response.status === 200) {
                    $scope.loginMessage = 'Login successful!'; // prints a message to the user
                }

                // if a new username was entered, a new user credential was added to the database
                else if (response.status === 201) {
                    $scope.loginMessage = 'Login created for: ' + response.data.message; // prints a message to the user
                }

                //creates a cookie storing the username and password after successful validation
                $cookies.put('username', userData.username);
                $cookies.put('password', userData.password);

                //Sets username and scope
                $scope.loggedIn = true;
                $scope.username = userData.username;
            })

            // Handles unsuccessful login attempts if the password is incorrect for a known username
            .catch(function(error) {
                // Handle login error
                $scope.loginMessage = 'Login Unsuccessful: ' + error.data.message; // prints a message to the user
            });
    };

    //handles logout functionality
    $scope.logout = function() {

        //removes cookies
        $cookies.remove('username');
        $scope.loggedIn = false;    //sets loggedIn to false

        //unsets scope variables
        $scope.username = '';
        $scope.password = '';
    };
});
