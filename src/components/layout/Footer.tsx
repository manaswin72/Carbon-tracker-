export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 lg:ml-64">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Carbon Tracker</h3>
            <p className="text-sm text-gray-600">
              Track your digital carbon footprint and make a positive impact.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Links</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="#" className="hover:text-green-600">About</a></li>
              <li><a href="#" className="hover:text-green-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-600">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Connect</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><a href="https://github.com/Eshaan-byte/Carbon-Tracker" target="_blank" className="hover:text-green-600">GitHub</a></li>
              <li><a href="#" className="hover:text-green-600">Report Issue</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          Made with 💚 for a sustainable digital future
        </div>
      </div>
    </footer>
  );
}
