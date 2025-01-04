import { product_model } from "../model/product.model.js";
import { register_model } from "../model/register.model.js";
import { user_product_model } from "../model/user_product.js";
import { response_message } from "../responses.js";

//product expiry check
function isProductExpiry(createdAt, validity) {
  const today = Math.floor(Date.now() / 1000);

  //createdAt in milliseconds
  const createdATMs = createdAt;

  //validity in miliscecond
  const validityMs = validity * 24 * 60 * 60;
  console.log("validitMs", validityMs);
  const expiration = createdATMs + validityMs;
  console.log("today", today);
  console.log("expiration", expiration);
  return today > expiration;
}

//buy api:
const buyTask = async (req, res) => {
  try {
    const { userProductId } = req.body;
    const user = req.access_verification;

    //product is is necessary
    if (!userProductId) {
      return response_message(
        res,
        400,
        false,
        "user product id is nescceary ",
        null
      );
    }

    const userProduct = await user_product_model
      .findOne({ _id: userProductId })
      .populate("product_id");
    if (!userProduct) {
      return response_message(
        res,
        400,
        false,
        "No Product assosiate wi9th this user  ",
        null
      );
    }

    console.log("user product", userProduct);
    console.log("user product created at", userProduct.product_id.createdAt);

    //check the product expiry
    if (
      isProductExpiry(
        userProduct.product_id.createdAt,
        userProduct.product_id.validity
      )
    ) {
      return response_message(res, 400, false, "product is expired ", null);
    }

    if (userProduct.buy == true) {
      return response_message(
        res,
        400,
        false,
        "wait for next day or sell it ",
        null
      );
    }

    if (userProduct.buy === true && userProduct.sell === true) {
      return response_message(res, 400, false, "buy or sell both done ", null);
    }

    userProduct.buy = true;
    userProduct.last_run = Math.floor(Date.now() / 1000);
    userProduct.save();
    return response_message(
      res,
      200,
      true,
      "buy successfull amount to sell ",
      userProduct
    );
  } catch (error) {
    return response_message(
      res,
      500,
      false,
      "erro in buy task api",
      error.message
    );
  }
};

const sellTask = async (req, res) => {
  const { userProductId } = req.body;
  const user = req.access_verification;

  try {
    //product is is necessary
    if (!userProductId) {
      return response_message(
        res,
        400,
        false,
        " user product id is nescceary ",
        null
      );
    }

    const userProduct = await user_product_model
      .findOne({ _id: userProductId })
      .populate("product_id");
    console.log("product", userProduct);

    //check the product expiry
    if (
      isProductExpiry(
        userProduct.product_id.createdAt,
        userProduct.product_id.validity
      )
    ) {
      return response_message(res, 400, false, "product is expired ", null);
    }

    if (!userProduct) {
      return response_message(
        res,
        400,
        false,
        "this product is not assosisate with this user",
        null
      );
    }

    if (userProduct.buy === false) {
      return response_message(res, 400, false, "You need to buy first", null);
    }

    if (userProduct.buy === true && userProduct.sell === true) {
      return response_message(res, 400, false, "buy or sell both donme ", null);
    }

    //increaase amount by 3 % and added in withdraw
    const amount = (userProduct.product_id.product_price * 3) / 100;

    const curr_user = await register_model.findOne({ _id: user._id });
    console.log("curr user", curr_user);
    console.log("amount", amount);
    curr_user.withdrawl_balance += amount;
    await curr_user.save();
    // update the sell flag

    userProduct.sell = true;
    userProduct.save();
    return response_message(res, 200, true, "sell succesfully  ", userProduct);
  } catch (error) {
    return response_message(
      res,
      500,
      false,
      "erro in sell task api",
      error.message
    );
  }
};

export { buyTask, sellTask };
