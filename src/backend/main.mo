import AccessControl "./authorization/access-control";
import Prim "mo:prim";
import Runtime "mo:core/Runtime";

actor {

  // ---- Authorization ----
  let accessControlState = AccessControl.initState();

  public shared ({ caller }) func _initializeAccessControlWithSecret(userSecret : Text) : async () {
    switch (Prim.envVar<system>("CAFFEINE_ADMIN_TOKEN")) {
      case (null) { Runtime.trap("CAFFEINE_ADMIN_TOKEN not set") };
      case (?adminToken) {
        AccessControl.initialize(accessControlState, caller, adminToken, userSecret);
      };
    };
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller)
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller)
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  // ---- Types ----
  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : Text;
    inStock : Bool;
    rating : Nat;
  };

  public type OrderItem = {
    productId : Nat;
    name : Text;
    quantity : Nat;
    price : Nat;
  };

  public type Order = {
    id : Nat;
    customerName : Text;
    phone : Text;
    address : Text;
    items : [OrderItem];
    total : Nat;
    status : Text;
  };

  public type RepairBooking = {
    id : Nat;
    customerName : Text;
    phone : Text;
    deviceModel : Text;
    issue : Text;
    status : Text;
  };

  // ---- State ----
  var nextProductId : Nat = 11;
  var nextOrderId : Nat = 0;
  var nextBookingId : Nat = 0;
  var productList : [Product] = [
    { id = 0; name = "Screen Replacement"; description = "Original quality display for iPhone/Android"; price = 1500; category = "Phone Repair"; imageUrl = "/assets/uploads/images-019d3771-302a-7349-a7c7-6babc76e25be-1.jpeg"; inStock = true; rating = 5 },
    { id = 1; name = "Battery Replacement"; description = "Genuine battery for all brands"; price = 500; category = "Phone Repair"; imageUrl = ""; inStock = true; rating = 5 },
    { id = 2; name = "Water Damage Repair"; description = "Full cleaning and repair service"; price = 800; category = "Phone Repair"; imageUrl = ""; inStock = true; rating = 4 },
    { id = 3; name = "TWS Wireless Earbuds"; description = "Noise cancellation, 24hr battery"; price = 799; category = "Accessories"; imageUrl = ""; inStock = true; rating = 4 },
    { id = 4; name = "Phone Case (Universal)"; description = "Shockproof silicone case"; price = 199; category = "Accessories"; imageUrl = ""; inStock = true; rating = 4 },
    { id = 5; name = "Fast Charger 33W"; description = "Type-C fast charger with cable"; price = 349; category = "Accessories"; imageUrl = ""; inStock = true; rating = 5 },
    { id = 6; name = "Redmi 12 (128GB)"; description = "Brand new sealed box, 1 year warranty"; price = 12999; category = "New Phones"; imageUrl = ""; inStock = true; rating = 4 },
    { id = 7; name = "Samsung Galaxy A14"; description = "Brand new with warranty"; price = 14999; category = "New Phones"; imageUrl = ""; inStock = true; rating = 4 },
    { id = 8; name = "iPhone 11 (Refurbished)"; description = "Excellent condition, fully tested"; price = 22000; category = "Used Phones"; imageUrl = ""; inStock = true; rating = 4 },
    { id = 9; name = "OnePlus 8T (Refurbished)"; description = "Good condition, 6 months warranty"; price = 15000; category = "Used Phones"; imageUrl = ""; inStock = true; rating = 4 },
    { id = 10; name = "iPhone Battery Replacement"; description = "Original Apple Li-ion battery. Fast service, 6 month warranty."; price = 1750; category = "Phone Repair"; imageUrl = "/assets/uploads/images_1-019d3779-d907-73c6-9657-4a4844ab62ba-1.jpeg"; inStock = true; rating = 5 },
  ];
  var orderList : [Order] = [];
  var bookingList : [RepairBooking] = [];

  // ---- Product APIs ----
  public query func getProducts() : async [Product] { productList };

  public query func getProductsByCategory(category : Text) : async [Product] {
    productList.filter(func(p : Product) : Bool { p.category == category })
  };

  public query func getProduct(id : Nat) : async ?Product {
    productList.find(func(p : Product) : Bool { p.id == id })
  };

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, category : Text, imageUrl : Text) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) { Runtime.trap("Unauthorized") };
    let id = nextProductId;
    nextProductId += 1;
    let p : Product = { id; name; description; price; category; imageUrl; inStock = true; rating = 5 };
    productList := productList.concat([p]);
    id
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, description : Text, price : Nat, category : Text, imageUrl : Text, inStock : Bool) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) { return false };
    var found = false;
    productList := productList.map(func(p : Product) : Product {
      if (p.id == id) { found := true; { p with name; description; price; category; imageUrl; inStock } }
      else { p }
    });
    found
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) { return false };
    let before = productList.size();
    productList := productList.filter(func(p : Product) : Bool { p.id != id });
    productList.size() < before
  };

  // ---- Order APIs ----
  public shared func placeOrder(customerName : Text, phone : Text, address : Text, items : [OrderItem], total : Nat) : async Nat {
    let id = nextOrderId;
    nextOrderId += 1;
    orderList := orderList.concat([{ id; customerName; phone; address; items; total; status = "pending" }]);
    id
  };

  public query ({ caller }) func getOrders() : async [Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) { return [] };
    orderList
  };

  public shared ({ caller }) func updateOrderStatus(id : Nat, status : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) { return false };
    var found = false;
    orderList := orderList.map(func(o : Order) : Order {
      if (o.id == id) { found := true; { o with status } } else { o }
    });
    found
  };

  // ---- Repair Booking APIs ----
  public shared func submitRepairBooking(customerName : Text, phone : Text, deviceModel : Text, issue : Text) : async Nat {
    let id = nextBookingId;
    nextBookingId += 1;
    bookingList := bookingList.concat([{ id; customerName; phone; deviceModel; issue; status = "pending" }]);
    id
  };

  public query ({ caller }) func getRepairBookings() : async [RepairBooking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) { return [] };
    bookingList
  };

  public shared ({ caller }) func updateBookingStatus(id : Nat, status : Text) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) { return false };
    var found = false;
    bookingList := bookingList.map(func(b : RepairBooking) : RepairBooking {
      if (b.id == id) { found := true; { b with status } } else { b }
    });
    found
  };
};
