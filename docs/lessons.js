const lessons = [
{
 title:"Chào hỏi", en:"Say hello", icon:"hand", color:"peach", time:15,
 intro:"Chào ai đó và hỏi họ có khỏe không.",
 words:[["hello","xin chào","Hello, Mai!"],["hi","chào","Hi, Tom!"],["good morning","chào buổi sáng","Good morning, Linh!"],["fine","khỏe, ổn","I'm fine, thank you."],["thank you","cảm ơn","Thank you, Ben."],["goodbye","tạm biệt","Goodbye, Anna!"]],
 rule:"Hỏi thăm với am và are",
 theory:[
  ["Hỏi người đối diện","Trong câu hỏi, đặt are trước you. How dùng để hỏi tình trạng.","How are you?","Bạn khỏe không?"],
  ["Trả lời về mình","Dùng I am hoặc I’m trước từ mô tả như fine. You đi với are, còn I đi với am.","I’m fine, thank you.","Tôi khỏe, cảm ơn bạn."]
 ],
 quiz:[
  ["Điền từ · I ___ fine, thank you.","am","I đi với am."],
  ["Chọn câu hỏi đúng.",["How are you?","How you are?","How am you?"],"Trong câu hỏi này, are đứng trước you."],
  ["Điền từ · How ___ you?","are","You đi với are."],
  ["Sắp xếp câu · Bạn có khỏe không?","How are you?","Mẫu hỏi thăm là How + are + you.",["you","How","are"]],
  ["Chọn cách viết đầy đủ của I’m fine.",["I am fine.","I are fine.","I is fine."],"I’m là dạng rút gọn của I am."],
  ["Sắp xếp câu · Tôi khỏe, cảm ơn bạn.","I am fine, thank you.","Đặt I am fine trước lời cảm ơn.",["fine,","thank you","am","I"]]
 ],
 script:["Good morning, Mai!","Hi, Tom! How are you?","I'm fine, thank you."],
 translation:"Chào buổi sáng, Mai! — Chào Tom! Bạn khỏe không? — Tôi khỏe, cảm ơn.",
 listen:["Tom trả lời thế nào?",["Tom khỏe.","Tom mệt.","Tom đói."]],
 speak:"Chào một người bạn và hỏi họ có khỏe không.", model:"Hi, Mai! How are you?",
 write:"Viết một lời chào và một câu hỏi thăm.", sample:"Hello, Ben! How are you?", checks:"Có lời chào và câu hỏi kết thúc bằng dấu hỏi."
},
{
 title:"Giới thiệu bản thân", en:"Introduce yourself", icon:"user", color:"mint", time:20,
 intro:"Nói tên, quê quán và nơi bạn đang sống.",
 words:[["name","tên","My name is Linh."],["from","đến từ","I'm from Vietnam."],["live","sống","I live in Hanoi."],["city","thành phố","Hanoi is a city."],["meet","gặp","Nice to meet you."],["too","cũng","Nice to meet you, too."]],
 rule:"Giới thiệu tên, quê quán và nơi ở",
 theory:[
  ["Tên của bạn","My name có nghĩa là tên của tôi. Sau My name, dùng is rồi đến tên.","My name is Mai.","Tên tôi là Mai."],
  ["Quê quán và nơi đang sống","Dùng I’m from + nơi bạn đến từ đó. Dùng I live in + nơi bạn đang sống.","I’m from Vietnam. I live in Hanoi.","Tôi đến từ Việt Nam. Tôi sống ở Hà Nội."]
 ],
 quiz:[
  ["Điền từ · My name ___ Linh.","is","My name đi với is."],
  ["Chọn câu nói về quê quán.",["I’m from Vietnam.","I live in Hanoi.","My name is Linh."],"From cho biết bạn đến từ đâu."],
  ["Điền từ · I live ___ Hanoi.","in","Dùng in trước tên thành phố trong mẫu I live in."],
  ["Sắp xếp câu · Tên tôi là Mai.","My name is Mai.","Đặt is giữa My name và tên.",["Mai","is","My name"]],
  ["Chọn câu nói đúng nghĩa «Tôi sống ở Hà Nội».",["I live in Hanoi.","I live from Hanoi.","I am live in Hanoi."],"Dùng I live in + nơi đang sống."],
  ["Sắp xếp câu · Tôi đến từ Việt Nam.","I’m from Vietnam.","Dùng I’m from + nơi bạn đến.",["Vietnam","I’m","from"]]
 ],
 script:["Hi, my name is Ben. I'm from Canada.","Hi, Ben! I'm Linh. I live in Hanoi.","Nice to meet you, Linh."],
 translation:"Chào, tôi tên Ben. Tôi đến từ Canada. — Chào Ben! Tôi là Linh. Tôi sống ở Hà Nội. — Rất vui được gặp bạn, Linh.",
 listen:["Linh đang sống ở đâu?",["Hà Nội","Canada","Đà Nẵng"]],
 speak:"Nói tên và quê quán của bạn.", model:"My name is Linh. I'm from Vietnam.",
 write:"Viết 3 câu giới thiệu tên, quê quán và nơi ở.", sample:"My name is Linh. I'm from Vietnam. I live in Hanoi.", checks:"Viết hoa tên riêng và dùng đúng from, in."
},
{
 title:"Gia đình", en:"Talk about family", icon:"heart", color:"lilac", time:20,
 intro:"Giới thiệu các thành viên trong gia đình.",
 words:[["family","gia đình","This is my family."],["mother","mẹ","This is my mother."],["father","bố","This is my father."],["sister","chị hoặc em gái","I have one sister."],["brother","anh hoặc em trai","I have a brother."],["child","con, trẻ em","I have one child."]],
 rule:"Giới thiệu người thân và nói mình có ai",
 theory:[
  ["This is + một người","Dùng This is khi giới thiệu một người. My đứng trước từ chỉ người thân và có nghĩa là của tôi.","This is my sister.","Đây là chị hoặc em gái của tôi."],
  ["I have + người thân","Dùng a trước brother hoặc sister khi nói có một người. Sau two, thêm -s vào brothers hoặc sisters.","I have a brother and two sisters.","Tôi có một anh hoặc em trai và hai chị hoặc em gái."]
 ],
 quiz:[
  ["Điền từ · This ___ my mother.","is","Dùng This is để giới thiệu một người."],
  ["Chọn câu đúng.",["This is my father.","This are my father.","This is father my."],"This đi với is và my đứng trước father."],
  ["Điền từ · I have two ___. (sister)","sisters","Sau two, dùng sisters ở số nhiều."],
  ["Sắp xếp câu · Đây là mẹ của tôi.","This is my mother.","Dùng This is + my + người thân.",["my","mother","This","is"]],
  ["Điền từ · I have ___ brother. (một)","a","Dùng a trước brother khi nói một người."],
  ["Sắp xếp câu · Tôi có hai anh hoặc em trai.","I have two brothers.","Đặt two trước danh từ số nhiều brothers.",["brothers","two","I","have"]]
 ],
 script:["This is my sister, Anna.","Hi, Anna! Do you have a brother?","Yes, I have one brother."],
 translation:"Đây là chị gái tôi, Anna. — Chào Anna! Bạn có anh hoặc em trai không? — Có, tôi có một anh hoặc em trai.",
 listen:["Anna có mấy anh hoặc em trai?",["Một","Hai","Ba"]],
 speak:"Giới thiệu một người trong gia đình bạn.", model:"This is my sister, Anna.",
 write:"Viết hai câu về gia đình bạn.", sample:"This is my mother. I have one sister.", checks:"Dùng my trước vai trò gia đình và one nếu muốn nói số lượng."
},
{
 title:"Một ngày của tôi", en:"My daily routine", icon:"clock", color:"sky", time:20,
 intro:"Kể những việc bạn làm hằng ngày và nói giờ.",
 words:[["wake up","thức dậy","I wake up at seven."],["eat","ăn","I eat breakfast at eight."],["breakfast","bữa sáng","I eat breakfast at home."],["work","làm việc","I work at nine."],["go home","về nhà","I go home at six."],["sleep","ngủ","I sleep at ten."]],
 rule:"Nói về thói quen và giờ giấc",
 theory:[
  ["I và she trong hiện tại đơn","Với I, dùng động từ gốc. Với she hoặc he, các động từ như start và work thêm -s.","I start work at nine. She starts work at nine.","Tôi bắt đầu làm việc lúc chín giờ. Cô ấy cũng bắt đầu lúc chín giờ."],
  ["Giờ cụ thể với at","Đặt at ngay trước giờ. Cụm at + giờ có thể đứng cuối câu.","I get up at seven.","Tôi thức dậy lúc bảy giờ."]
 ],
 quiz:[
  ["Điền dạng đúng · I ___ at home. (work)","work","Sau I, dùng work."],
  ["Điền dạng đúng · She ___ at home. (work)","works","Sau she, thêm -s vào work."],
  ["Chọn câu đúng.",["She starts work at nine.","She start work at nine.","She starts work in nine."],"She đi với starts và at đứng trước giờ."],
  ["Điền từ · I get up ___ seven.","at","Dùng at trước một giờ cụ thể."],
  ["Sắp xếp câu · Tôi thức dậy lúc bảy giờ.","I get up at seven.","Dùng I + get up + at seven.",["seven","get up","I","at"]],
  ["Sắp xếp câu · Cô ấy bắt đầu làm việc lúc chín giờ.","She starts work at nine.","Dùng starts sau She và đặt at nine cuối câu.",["at nine","work","She","starts"]]
 ],
 script:["What time do you wake up?","I wake up at seven. I eat breakfast at eight.","I go to work at nine."],
 translation:"Bạn thức dậy lúc mấy giờ? — Tôi thức dậy lúc bảy giờ. Tôi ăn sáng lúc tám giờ. — Tôi đi làm lúc chín giờ.",
 listen:["Người nói thức dậy lúc mấy giờ?",["7 giờ","8 giờ","9 giờ"]],
 speak:"Nói bạn thức dậy và ăn sáng lúc mấy giờ.", model:"I wake up at seven. I eat breakfast at eight.",
 write:"Viết ba câu về các việc bạn làm mỗi ngày.", sample:"I wake up at seven. I work at nine. I go home at six.", checks:"Mỗi câu bắt đầu bằng I và dùng at trước giờ."
},
{
 title:"Gọi đồ ăn và thức uống", en:"Order food and drinks", icon:"cup", color:"peach", time:20,
 intro:"Gọi món lịch sự ở quán cà phê hoặc nhà hàng.",
 words:[["coffee","cà phê","I'd like a coffee, please."],["tea","trà","I'd like a tea, please."],["water","nước","I'd like some water, please."],["sandwich","bánh mì kẹp","I'd like a sandwich."],["menu","thực đơn","Can I see the menu, please?"],["please","làm ơn, vui lòng","A sandwich, please."]],
 rule:"Gọi món với I’d like, a và some",
 theory:[
  ["Gọi món lịch sự","I’d like là dạng rút gọn của I would like. Đặt tên món hoặc đồ uống ngay sau I’d like.","I’d like a sandwich, please.","Cho tôi một bánh mì kẹp."],
  ["Nói số lượng","Dùng a khi gọi một món đếm được như a sandwich. Dùng some khi gọi một lượng nước mà không nói rõ bao nhiêu.","I’d like some water, please.","Cho tôi một ít nước."]
 ],
 quiz:[
  ["Điền từ · I’d like ___ sandwich, please. (một cái)","a","Dùng a với một chiếc sandwich."],
  ["Điền từ · I’d like ___ water, please. (một ít)","some","Dùng some khi nói một lượng nước không xác định."],
  ["Chọn cách gọi nước đúng với nghĩa «Cho tôi một ít nước».",["I’d like some water, please.","I’d like a water, please.","I’d like waters some, please."],"Some water có nghĩa là một ít nước."],
  ["Sắp xếp câu · Cho tôi một bánh mì kẹp.","I’d like a sandwich, please.","Đặt món sau I’d like và thêm please ở cuối.",["please","a sandwich,","I’d like"]],
  ["Chọn dạng đầy đủ của I’d like.",["I would like.","I am like.","I do like."],"Trong mẫu gọi món này, ’d là would."],
  ["Sắp xếp câu · Cho tôi một ít nước.","I’d like some water, please.","Some đứng trước water.",["water,","some","please","I’d like"]]
 ],
 script:["Hello! What would you like?","I'd like a coffee and a sandwich, please.","Of course. Here you go."],
 translation:"Xin chào! Bạn muốn dùng gì? — Cho tôi một cà phê và một bánh mì kẹp. — Vâng. Của bạn đây.",
 listen:["Khách gọi gì?",["Cà phê và bánh mì kẹp","Trà và bánh mì kẹp","Cà phê và nước"]],
 speak:"Gọi một đồ uống và một món ăn.", model:"I'd like a tea and a sandwich, please.",
 write:"Viết một câu gọi nước và một câu gọi món ăn.", sample:"I'd like some water, please. I'd like a sandwich.", checks:"Dùng some water và a sandwich. Có thể thêm please."
},
{
 title:"Hỏi đường", en:"Ask for directions", icon:"pin", color:"mint", time:20,
 intro:"Hỏi một địa điểm và hiểu chỉ dẫn đơn giản.",
 words:[["excuse me","xin lỗi, cho tôi hỏi","Excuse me, where is the bank?"],["bank","ngân hàng","The bank is on the left."],["station","nhà ga","Where is the station?"],["left","bên trái","Turn left."],["right","bên phải","Turn right."],["straight","thẳng","Go straight."]],
 rule:"Hỏi vị trí và chỉ đường",
 theory:[
  ["Where is + địa điểm?","Dùng Where is để hỏi vị trí của một nơi. Có thể mở lời lịch sự bằng Excuse me.","Excuse me. Where is the bank?","Xin lỗi, ngân hàng ở đâu ạ?"],
  ["Chỉ đường bằng động từ","Bắt đầu bằng động từ để chỉ đường. Go straight là đi thẳng. Turn left và Turn right là rẽ trái và rẽ phải.","Go straight. Turn left.","Đi thẳng. Rẽ trái."]
 ],
 quiz:[
  ["Điền từ · Where ___ the bank?","is","Dùng is khi hỏi vị trí của một địa điểm."],
  ["Chọn câu hỏi đúng.",["Where is the station?","Where the station is?","Where are the station?"],"Đặt is sau Where khi hỏi một địa điểm."],
  ["Điền từ · Turn ___. (rẽ trái)","left","Left có nghĩa là bên trái."],
  ["Sắp xếp câu · Ngân hàng ở đâu?","Where is the bank?","Dùng Where + is + the bank.",["the bank","is","Where"]],
  ["Chọn câu có nghĩa «Đi thẳng».",["Go straight.","Turn right.","Turn left."],"Straight có nghĩa là thẳng trong câu chỉ đường này."],
  ["Sắp xếp câu · Rẽ phải.","Turn right.","Câu chỉ đường bắt đầu bằng Turn.",["right","Turn"]]
 ],
 script:["Excuse me, where is the station?","Go straight, then turn left.","Thank you!"],
 translation:"Cho tôi hỏi, nhà ga ở đâu? — Đi thẳng rồi rẽ trái. — Cảm ơn!",
 listen:["Sau khi đi thẳng, người hỏi cần làm gì?",["Rẽ trái","Rẽ phải","Quay lại"]],
 speak:"Hỏi đường đến ngân hàng.", model:"Excuse me, where is the bank?",
 write:"Viết một câu hỏi đường và một câu chỉ đường.", sample:"Excuse me, where is the station? Go straight, then turn left.", checks:"Dùng Where is để hỏi và Turn hoặc Go để chỉ đường."
},
{
 title:"Ôn tập tuần 1", en:"Week one review", icon:"star", color:"lilac", time:20,
 intro:"Ôn những mẫu câu đã học qua một tình huống ở quán cà phê.",
 words:[["good morning","chào buổi sáng","Good morning, Ben!"],["name","tên","My name is Anna."],["sister","chị hoặc em gái","This is my sister."],["coffee","cà phê","I'd like a coffee."],["station","nhà ga","Where is the station?"],["go straight","đi thẳng","Go straight to the station."]],
 rule:"Ôn mẫu câu", explain:"Dùng “My name is…” để giới thiệu, “I'd like…” để gọi món và “Where is the…?” để hỏi đường.",
 quiz:[["Điền từ · My name ___ Anna.","is","My name đi cùng is."],["Chọn câu gọi cà phê",["I'd like a coffee.","Where is the station?","I have a sister."],"I'd like giúp bạn gọi món."],["Xếp câu · station / Where / the / is","Where is the station","Đặt Where đầu câu rồi đến is the station."]],
 script:["Good morning! My name is Anna.","Hi, Anna. I'm Ben. What would you like?","I'd like a coffee, please. And where is the station?","Go straight. The station is on the right."],
 translation:"Chào buổi sáng! Tôi tên Anna. — Chào Anna. Tôi là Ben. Bạn muốn dùng gì? — Cho tôi một cà phê. Và nhà ga ở đâu vậy? — Đi thẳng. Nhà ga nằm bên phải.",
 listen:["Nhà ga nằm phía nào?",["Bên phải","Bên trái","Phía sau quán"]],
 speak:"Chào, giới thiệu tên rồi gọi một đồ uống.", model:"Good morning! My name is Anna. I'd like a coffee, please.",
 write:"Viết một đoạn ba câu gồm chào hỏi, giới thiệu và hỏi đường.", sample:"Good morning! My name is Anna. Where is the station?", checks:"Có đủ lời chào, tên và câu hỏi đường."
}];
